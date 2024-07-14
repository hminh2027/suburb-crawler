import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as Cheerio from 'cheerio';
import { writeFileSync } from 'fs';
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
