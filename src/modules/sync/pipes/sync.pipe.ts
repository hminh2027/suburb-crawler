import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class KebabToCamelCasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') {
      return value;
    }

    const transformedValue = {};
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const camelCaseKey = key.replace(/-./g, (x) => x[1].toUpperCase());
        transformedValue[camelCaseKey] = value[key];
      }
    }
    return transformedValue;
  }
}
