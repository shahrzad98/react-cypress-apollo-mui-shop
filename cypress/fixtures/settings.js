export const brandStoreData = {
  data: {
    user: {
      getUserRead: {
        my_store: [
          {
            id: '4',
            name: 'فروشگاه ندالینا',
            guild: 'پوشاک (لباس و کیف و کفش و ...)',
            telephone_number: '+982177293696',
            birthday: '1997-01-15',
            email: 'm.amin.h.h@gmail.com',
            first_name: 'محمد امین ها',
            last_name: 'حاجی حسینی',
            national_code: '4112031521',
            phone_number: '+989124724088',
            sheba_number: '',
            store_address: {
              address: 'تهران- خ مطهری- خ میرزای شیرازی- کوچه اخر',
              city: 'تهران',
              province: 'تهران',
              latitude: '35.6945660000000000',
              longitude: '51.3484460000000000',
              postal_code: '6919747848',
              __typename: 'StoreAddress'
            },
            logo: {
              image:
                'https://ec5e4302d4074115f056a3882a074256.cdn.cafebazaar.cloud/media/item_images/Neda-designstyle-popstar-m_46WcPGe.png',
              __typename: 'Image'
            },
            __typename: 'UserReadMyStore'
          }
        ],
        __typename: 'UserRead'
      },
      __typename: 'UserQuery'
    }
  }
};
export const editStore = {
  data: {
    store: {
      editStoreData: null,
      __typename: 'StoreMutation'
    }
  }
};
