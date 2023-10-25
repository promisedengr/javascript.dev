// TODO: Заменить на реальный импорт ../../../config/config.debug
// написать скрипт для CI подмены конфигов в зависимости от кружения

import { config } from '../../config/config.debug';

function getConfig() {
  return config;
}
export { getConfig };

