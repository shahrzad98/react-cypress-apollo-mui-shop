import React from 'react';
import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_MANAGER } from '../../../../../constant/queries/orders';

const Style = styled(Grid)({
  '& ul': {
    margin: '0',
    padding: '0',
    listStyle: 'none',
    '& li': {
      display: 'flex',
      marginBottom: '1rem',
      borderBottom: '1px solid #C9C3E0',
      paddingBottom: '1rem',
      '&:last-child': {
        border: 'none',
        paddingBottom: '0',
        marginBottom: '1rem'
      },
      '& .product--info': {
        flex: '2 1',
        display: 'flex',
        '& .product--info--image': {
          marginRight: '.5rem',
          '& img': {
            width: '100px',
            height: '100px',
            objectFit: 'cover',
            background: '#fff',
            borderRadius: '10px'
          }
        },
        '& .product--info--detail': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          '& .product--info--detail_title': {
            marginBottom: '1rem',
            '& p': {
              margin: '0',
              fontSize: '14px'
            }
          }
        },
        '& .product--info--detail_options': {
          borderLeft: '2px solid #F3F3F3',
          paddingLeft: '10px',
          '& .product--info--detail_options_item': {
            display: 'flex',
            '& p': {
              flex: '1 1',
              fontSize: '12px',
              margin: '0',
              '&:first-of-type': {
                color: '#ADAABA',
                marginRight: '10px'
              }
            }
          }
        }
      },
      '& .product--price': {
        flex: '1 1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        alignItems: 'flex-end',
        '& p': {
          margin: '0',
          fontSize: '14px',
          color: '#ADAABA',
          textDecoration: 'line-through',
          '&:last-child': {
            color: '#000',
            textDecoration: 'none',
            fontSize: '16px'
          }
        }
      }
    }
  }
});

const Items = ({ orderId }) => {
  const { data } = useQuery(GET_MANAGER, {
    variables: {
      getManagerId: orderId
    }
  });

  const { items } = data.order.getManager;

  return (
    <Style item xs={12}>
      <ul>
        {items.map(
          (
            {
              details: {
                variant: {
                  cost,
                  primary_cost,
                  images,
                  option_values,
                  product_serialized: {
                    label,
                    chosen_image,
                    images: productImages
                  }
                }
              },
              unit_amount
            },
            i
          ) => {
            const image = [
              images?.length && images[0].image,
              chosen_image?.image && chosen_image.image,
              productImages?.length && productImages[0].image
            ].filter(Boolean);

            return (
              <li key={i}>
                <div className="product--info">
                  <div className="product--info--image">
                    <img src={image.length ? image[0] : ''} alt="image" />
                  </div>
                  <div className="product--info--detail">
                    <div className="product--info--detail_title">
                      <p>
                        {label} x{unit_amount}
                      </p>
                    </div>
                    <div className="product--info--detail_options">
                      {option_values.map(({ option: { name }, value }, j) => (
                        <div
                          className="product--info--detail_options_item"
                          key={j}
                        >
                          <p>{name}</p>
                          <p>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="product--price">
                  {cost !== primary_cost && (
                    <p>{primary_cost.toLocaleString()} تومان</p>
                  )}
                  <p>{cost.toLocaleString()} تومان</p>
                </div>
              </li>
            );
          }
        )}
      </ul>
    </Style>
  );
};

export default Items;
