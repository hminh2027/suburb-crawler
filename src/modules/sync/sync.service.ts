import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ADDRESS_BBOX, StatName } from 'src/constants';
import { genRawPayload } from 'src/utils';

@Injectable()
export class SyncService {
  syncByStatName(statName: StatName) {
    const baseUrl = 'https://www.microburbs.com.au/heat-map';
    const rawPayload = genRawPayload({
      statName,
      bboxArea: ADDRESS_BBOX.SYDNEY,
    });
    console.log(rawPayload);
    axios
      .post(baseUrl, rawPayload)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
