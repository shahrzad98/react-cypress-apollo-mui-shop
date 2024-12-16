import { Button, Grid } from '@mui/material';
import React from 'react';
import { Style } from './style';
import { ReactComponent as EditSVG } from './svg/edit.svg';
import { ReactComponent as DeleteSVG } from './svg/delete.svg';
import { ReactComponent as DeleteDSVG } from './svg/deleteDisabled.svg';
import { ReactComponent as AddSVG } from './svg/add.svg';
import { Link, useNavigate } from 'react-router-dom';

const CategoryModal = ({ close, open, category, deleteClick }) => {
  const navigate = useNavigate();
  return (
    <Style open={open} onClose={close} anchor="bottom">
      <Grid container className="content">
        <Grid container justifyContent="center">
          {' '}
          <Grid className="divider"></Grid>
        </Grid>
        {!category?.parent && (
          <Grid container>
            <Button
              data-cy="create_sub"
              onClick={() =>
                navigate(
                  `/products/categories/create_sub_category/${category?.id}`
                )
              }
              className="btn"
              startIcon={<AddSVG />}
            >
              {' '}
              تعریف زیر دسته بندی
            </Button>
          </Grid>
        )}
        <Grid container>
          <Link
            style={{ textDecoration: 'none' }}
            to={
              !category?.parent
                ? `/products/categories/edit_category/${category?.id}`
                : `/products/categories/edit_category/${category?.parent}/${category?.id}`
            }
          >
            <Button
              onClick={() => {
                close();
              }}
              className="btn"
              data-cy="edit_modal"
              startIcon={<EditSVG />}
            >
              ویرایش
            </Button>
          </Link>
        </Grid>

        <Grid container>
          <Button
            disabled={
              category?.products?.length > 0 ||
              category?.child_categories?.length > 0
            }
            onClick={deleteClick}
            className="btn"
            data-cy="del_modal"
            startIcon={
              category?.products?.length > 0 ? <DeleteDSVG /> : <DeleteSVG />
            }
          >
            حذف
          </Button>
        </Grid>
      </Grid>
    </Style>
  );
};

export default CategoryModal;
