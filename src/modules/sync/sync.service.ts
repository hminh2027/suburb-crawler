import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as Cheerio from 'cheerio';
import { readFileSync, writeFileSync } from 'fs';
import { merge } from 'lodash';
import { ADDRESS_BBOX } from 'src/constants';
import { GoogleSheetsService } from 'src/lib/google-sheets/google-sheets.service';
import {
  genRawPayload,
  mergeData,
  readSuburbFromFile,
  transformData,
  writeSuburbToFile,
} from 'src/utils';

@Injectable()
export class SyncService {
  constructor(private readonly googleSheetsService: GoogleSheetsService) {}

  syncAllStatsToCouncil(council) {
    const baseUrl = 'https://www.microburbs.com.au/heat-map';

    // Around 200 stats. I want to make 5 requests every 0.2 minutes (use setInterval) (stop the timer when all requests are done)

    const rawStatList = readFileSync('crawler/stat-list.json', 'utf8');

    // And, let just do the 101 to end of list

    const halfStatList = JSON.parse(rawStatList).map(
      (item) => Object.values(item)[0],
    );

    const timer = setInterval(
      () => {
        if (halfStatList.length === 0) {
          clearInterval(timer);
        } else {
          // Take 5 stats from the list and remove them from the list
          const statList = halfStatList.splice(0, 5);
          const promises = statList.map((statName) => {
            const rawPayload = genRawPayload({
              statName,
              bboxArea: ADDRESS_BBOX.CANBERRA,
            });

            return axios
              .post(baseUrl, rawPayload)
              .then((response) => {
                console.log(response);
                const data: object = response.data.data;
                const transformedData = transformData(
                  Object.values(data),
                  statName,
                );

                return transformedData;
              })
              .catch((error) => {
                console.error(error);
              });
          });

          Promise.all(promises).then((values) => {
            console.log(values);
            const localData = readSuburbFromFile(council);

            const mergedValues = values.reduce((acc, curr) => {
              return merge(acc, curr);
            }, {});
            const mergedData = mergeData(localData, mergedValues);

            writeSuburbToFile(mergedData, council);
          });
        }
      },
      1000 * 60 * 0.2,
    );
  }

  syncByStatName(statName) {
    // const baseUrl = 'https://www.microburbs.com.au/heat-map';
    // const rawPayload = genRawPayload({
    //   statName,
    //   bboxArea: ADDRESS_BBOX.SYDNEY,
    // });
    // console.log(rawPayload);
    // axios
    //   .post(baseUrl, rawPayload)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  async writeToSheet() {
    this.googleSheetsService.createSheet('World');
  }

  async writeToLocal() {
    const baseUrl = 'https://www.microburbs.com.au/heat-map';
    const statName = 'tt-public-housing';

    const rawPayload = genRawPayload({
      statName,
      bboxArea: ADDRESS_BBOX.SYDNEY,
    });
    console.log(rawPayload);
    axios
      .post(baseUrl, rawPayload)
      .then((response) => {
        const data: object = response.data.data;
        const transformedData = transformData(Object.values(data), statName);
        const localData = readSuburbFromFile('sydney');

        const mergedData = mergeData(localData, transformedData);

        writeSuburbToFile(mergedData, 'sydney');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async syncStatList() {
    const url = 'https://www.microburbs.com.au/heat-maps';
    const { data } = await axios.get(url);
    const $ = Cheerio.load(data);

    const panels = $('.panel').get();

    const temp = panels.map((panel) => {
      const panelHeading = $(panel).find('.panel-heading').text().trim();
      const panelBody = $(panel).find('.panel-body');

      const aTags = panelBody.find('a').get();
      const aText = aTags.map((aTag) => {
        const aLink = $(aTag).attr('href').split('/').pop();
        return {
          [$(aTag).text().trim()]: aLink,
          type: panelHeading,
        };
      });

      return aText;
    });

    // Flatten the array
    const finalData = temp.flat();

    writeFileSync('crawler/stat-list.json', JSON.stringify(finalData, null, 2));

    return finalData;
  }
}
