const orderStatusColors = {
  yellow: '#FFE815',
  gray: '#D0D4E5',
  green: '#6DDB9C',
  red: '#FB164D',
};

export function getOrderColorByStatus(orderStatus: number) {
  switch (orderStatus) {
    case 0:
      return orderStatusColors.yellow;
    case 11:
      return orderStatusColors.gray;
    case 12:
      return orderStatusColors.green;
    case 13:
      return orderStatusColors.red;
    case 14:
    case 15:
    case 16:
      return orderStatusColors.green;
    case 17:
    case 18:
      return orderStatusColors.gray;
    case 19:
      return orderStatusColors.green;
    case 20:
      return orderStatusColors.yellow;
    case 21:
      return orderStatusColors.red;
    case 22:
      return orderStatusColors.gray;
    case 23:
    default:
      return orderStatusColors.red;
  }
}
