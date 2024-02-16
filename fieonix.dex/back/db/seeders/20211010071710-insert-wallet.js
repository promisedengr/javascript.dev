'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('wallets', [
      {
        user_id: '1',
        account_categ: 'interest',
        blockchain: 'eth',
        private: 'a33c0a41c316143ff4f9e136a1afe920823dcef24f4ec9778cba57b9da74ff3b',
        public: '04ce5ab5ca9b9d387fedb624b688312ccbf262bc58e2de3875c762a679068db377590bfafe44fffce2ee6e08d74fea0fa73c0805ffb501b28b2112e27c16be1776',
        address: '831ceaa2861c008b36bf4c0570c0042a8372ffde',
        wif: ''
      },
      {
        user_id: '1',
        account_categ: 'interest',
        blockchain: 'btc',
        private: '52d092087a5c58df7c934c94cbb4f73f5a2c7dc2eb33560514056442e731fed1',
        public: '026ad586805054c809ce66a370c233bea4a701e30a14ec1171175360447144d0ef',
        address: 'mpBoNcsZzHXFSaDAD6Ciw2DE5dKuYdRDkm',
        wif: 'cQMgYgx9huyyZ3n4hfdZFu3fSYppGMEuhU8xoZkrbeRQprcScRy2'
      },
      {
        user_id: '1',
        account_categ: 'interest',
        blockchain: 'sol',
        private: '',
        public: '',
        address: '4LTgNNt1yzQpUTKX7RRmeE3ddSJMgmjfPn6x8Anrwn5N',
        wif: 'cake discover enemy unit cute trial poem buffalo sentence arena fire electric'
      },
      {
        user_id: '1',
        account_categ: 'pension',
        blockchain: 'eth',
        private: '101a2cf85cc9bab68d01740e342f030f0c16ea334095916a1c7ec0e52dea3b',
        public: '04aaddc5967f009ca16e6a09a3eca954cc451cfaa68f727878cec214e93d4dc1046752feecd8f689554268252aaa2b8f8db25a03ab4c89188713ccf5fb6a57712c',
        address: '3f575867738dea1301eebd25ed8703ad910bb39d',
        wif: ''
      },
      {
        user_id: '1',
        account_categ: 'pension',
        blockchain: 'btc',
        private: '50aa8339221c64072efeef14c7c497cef2c61dac3ab8be7dacf3f1490e23f93c',
        public: '0292ba51f78ad5f92321aabfb0534aaafb90c5b0fb72dcf5ee9b221db9d4fea53c',
        address: 'mzKd7qrQfYQ252Nwnmg3pXBTZYoPZgUfoi',
        wif: 'cQHWJCZHMpXm5tJfWKo93Tz4DeiNKvwJSzgZNmi2T7ydWxUuuq22'
      },
      {
        user_id: '1',
        account_categ: 'pension',
        blockchain: 'sol',
        private: '',
        public: '',
        address: '2NfcaXuBDv1VWXwUNhTzGq9FUs6z5wsqA5CqWGTDhVzU',
        wif: 'display behave analyst sniff jungle favorite fit toe human slice client slogan'
      },
      {
        user_id: '2',
        account_categ: 'interest',
        blockchain: 'eth',
        private: '6f62831f0e97337aef5e5fcfb2889d530ab64b1727348f4f6e39db8648f83a1e',
        public: '0409d5f1fa12de89b43cac90bf3f011442b82228d11094ac03c928eabe7dcd44befecd28d23c8c4644def7ae855c1be84f3caf34e5d4da8d834037446315dc8c28',
        address: '76f6fc52969af3a28e75332aaab960126c7f98c1',
        wif: ''
      },
      {
        user_id: '2',
        account_categ: 'interest',
        blockchain: 'btc',
        private: 'f1d32c69f8681c1a9745e40789443f8502a5bda54b18cb6cc6eab315c5a152e1',
        public: '032e6027a846a57f22f8a6be26b2a911236bd4c1b7749614780efc5f43a393d6df',
        address: 'mgkzaCr4GUHmwrgYj52rJPym6fEZzHgPdq',
        wif: 'cVgn4EKf2GDHE4sLfPU1MJKXH5Wvxzh9xgzrCvxmKcpeWgLtiipC'
      },
      {
        user_id: '2',
        account_categ: 'interest',
        blockchain: 'sol',
        private: '',
        public: '',
        address: '9zftaxkgL55aBN5jnwq9tgQCiaFJfMxmqngVAxX5gbFP',
        wif: 'park end warm hint detect misery element good yard almost inmate small'
      },
      {
        user_id: '2',
        account_categ: 'pension',
        blockchain: 'eth',
        private: '9c61adeaf6096eaebe3e47e893a98d1ff04ed58af9b1b7491ebb271fed309a29',
        public: '0473d683614f03a7a4d93cd85e7b7b3092068503c3325dafcf5a678a857fa8d80ea35053a48d31613cffeae2b944cc4c692af7523ff0d27fdbb99ad3bd09bf896d',
        address: 'c23cfd97c1f693a6de2ea226b589d46ff94a7732',
        wif: ''
      },
      {
        user_id: '2',
        account_categ: 'pension',
        blockchain: 'btc',
        private: '979e0de22c114d7366959152075ab0d00ef551007a123bd2e5da1a33aeb49ac5',
        public: '03aeaa13031b80d9feeebce85dd1f11d775da72ec79383f0d6512d6c7c3c3dfb94',
        address: 'mw5zxhrv9iLn2EBtNEpzfXSrMnPEFVoBhv',
        wif: 'cSfRfVZa7TfhNtxBRAWhkmWpF8diVcq5f7w2A2VJQaCvvKoLJiMF'
      },
      {
        user_id: '2',
        account_categ: 'pension',
        blockchain: 'sol',
        private: '',
        public: '',
        address: '8uDFcQhmAVT9ZePbuKixQaxgcZqnyD4427mLEy9Vdqvj',
        wif: 'push boat language dune engage poet glove pause spin ten history cargo'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('wallets', null, {});
  }
};
