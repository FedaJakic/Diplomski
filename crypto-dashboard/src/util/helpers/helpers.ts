import _ from 'lodash';

export const BLOCK_HEIGHT_REGEX = /\b(\d+)\b/;
export const BLOCK_HASH_TARGET = '0000000000';
export const LimitPerPage: number = 5;
export enum PaginationDesign {
  LeftDoubleArrow = '&laquo;',
  LeftArrow = '&lsaquo;',
  RightDoubleArrow = '&raquo;',
  RightArrow = '&rsaquo;',
  LeftDots = '... ',
  RightDots = ' ...',
}
export const calculateTimeBasedOnTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'Europe/Zagreb',
  };

  return date.toLocaleString(undefined, options);
};

export const satoshisToBTC = (satoshis: number): string => {
  return `${satoshis / 100000000} BTC`;
};

export const returnPaginationRange = (
  totalPage: number,
  page: number,
  siblings: number
): any => {
  let totalPageNumberinArray = 7 + siblings;
  if (totalPageNumberinArray >= totalPage) return _.range(1, totalPage + 1);
  let leftSiblingIndex = Math.max(page - siblings, 1);
  let rightSiblingIndex = Math.min(page + siblings, totalPage);
  let showLeftDots = leftSiblingIndex > 2;
  let showRightDots = rightSiblingIndex < totalPage - 2;
  if (!showLeftDots && showRightDots) {
    let leftItemsCount = 3 + 2 * siblings;
    let leftRange = _.range(1, leftItemsCount + 1);
    return [...leftRange, PaginationDesign.RightDots, totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemsCount = 3 + 2 * siblings;
    let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage + 1);
    return [1, PaginationDesign.LeftDots, ...rightRange];
  } else {
    let middleRange = _.range(leftSiblingIndex, rightSiblingIndex + 1);
    return [
      1,
      PaginationDesign.LeftDots,
      ...middleRange,
      PaginationDesign.RightDots,
      totalPage,
    ];
  }
};

export const isObjectEmpty = (obj: Object) => {
  return Object.keys(obj).length === 0;
};
