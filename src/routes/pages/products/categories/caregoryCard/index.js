import {
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Style } from './style';
import { ReactComponent as MoreInfoSVg } from '../../list/productCard/svg/moreInfoSVG.svg';
import { ReactComponent as TrashSVG } from '../../../../../components/createProduct/svg/trashCan.svg';
import { Add } from '@mui/icons-material';
import { formatNumber } from '../../../../../utils/helpers';
import { ReactComponent as CategorySVG } from './svg/category.svg';
import { useNavigate } from 'react-router-dom';
const CategoryCard = ({
  category,
  moreClick,
  selectedCat,
  isSubCat,
  deleteProd,
  setSelectedProd,
  boom,
  data_cy = ''
}) => {
  const cardRef = useRef();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (boom > 0) setIsOpen(false);
  }, [boom]);
  return (
    <Style
      expanded={isOpen}
      onClick={() => {
        if (selectedCat?.id !== category?.id) {
          setIsOpen(!isOpen);
        }
      }}
      isSubCategory={isSubCat}
      ref={cardRef}
      style={{
        zIndex:
          selectedCat?.id === category?.id &&
          cardRef.current.getBoundingClientRect().top < 560
            ? 1500
            : ''
      }}
    >
      <AccordionSummary
        data-cy={data_cy}
        expandIcon={<i className="df-arrow" />}
      >
        <Grid
          style={{
            borderLeft: '0.5px solid #C9C3E0',
            width: '88%',
            position: 'relative'
          }}
          container
        >
          {category?.image?.image ? (
            <img src={category?.image?.image}></img>
          ) : (
            <div className="emptyImage">
              <CategorySVG />
            </div>
          )}
          <Grid ml={1}>
            <h3>{category?.title}</h3>
            <h4>{category?.products?.length} محصول</h4>
          </Grid>
          <Grid className="showMore">
            <IconButton
              data-cy="more_click"
              onClick={e => {
                e.stopPropagation();
                moreClick();
              }}
              style={{ padding: 0 }}
            >
              <MoreInfoSVg />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container className="content">
          <Grid container justifyContent="space-between">
            <h5>محصولات</h5>
            <IconButton
              onClick={() =>
                navigate(
                  `/products/categories/add_product/${category?.id}?origin=list`
                )
              }
            >
              <Add />
            </IconButton>
          </Grid>
        </Grid>
        {category?.products?.length < 1 ? (
          <Grid className="empty-products" container data-cy="empty-products">
            <div>
              <i className="df-product" />
              <p>محصولی پیدا نشد!</p>
            </div>
          </Grid>
        ) : (
          <Grid className="products" container>
            {category?.products?.map(e => (
              <Grid
                alignItems="center"
                className="product-row"
                key={e.id}
                data-cy="products"
                container
              >
                <img src={e?.images[0]?.image}></img>
                <Typography component={'h4'} noWrap style={{ width: '45%' }}>
                  {e?.label}
                </Typography>
                <div className="divider"></div>
                <h4>
                  {formatNumber(e?.cost)} <span>تومان</span>
                </h4>
                <IconButton
                  data-cy={'trash'}
                  onClick={() => {
                    setSelectedProd(e);
                    deleteProd();
                  }}
                  className="delete_icon"
                >
                  <TrashSVG />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        )}
      </AccordionDetails>
    </Style>
  );
};

export default CategoryCard;
