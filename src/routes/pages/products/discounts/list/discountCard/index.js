import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton
} from '@mui/material';
import React, { useState } from 'react';
import { Style } from './style';
import { ReactComponent as CashSVG } from '../../svg/cashDiscount.svg';
import { ReactComponent as PercentSVG } from '../../svg/percentDiscount.svg';
import { ReactComponent as CopyIcon } from '../../svg/copySVG.svg';
import { formatDate, formatNumber } from '../../../../../../utils/helpers';
import { ReactComponent as TrashSVG } from '../../../../../../components/createProduct/svg/trashCan.svg';

const DiscountCard = ({ discount, deleteHandler, onCopy, key }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Style key={key} container mt={2} data-cy="discountCard">
      <Accordion onClick={() => setExpanded(!expanded)} expanded={expanded}>
        <AccordionSummary expandIcon={<i className="df-arrow" />}>
          {discount?.voucher_type === 2 ? <CashSVG /> : <PercentSVG />}
          <h3>{discount?.name || 'تخفیف'}</h3>
          {expanded && (
            <TrashSVG
              onClick={e => {
                e.stopPropagation();
                deleteHandler();
              }}
              className="delete_icon"
            />
          )}
        </AccordionSummary>
        <AccordionDetails data-cy="AccordionDetails">
          {discount?.voucher_type === 2 ? (
            <>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">مبلغ</p>
                <p className="value">{formatNumber(discount?.amount)} تومان</p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">حداقل خرید</p>
                <p className="value"> {formatNumber(discount?.limit)} تومان</p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">از تاریخ</p>
                <p className="value">
                  {discount?.start_date
                    ? formatDate(discount?.start_date)
                    : '1400/5/5'}
                </p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">تا تاریخ</p>
                <p className="value">
                  {discount?.expire_date
                    ? formatDate(discount?.expire_date)
                    : '1400/5/5'}
                </p>
              </Grid>
              <Grid
                mt={2}
                className="code_container"
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <p className="title">کد تخفیف</p>
                <p className="value">
                  {discount?.code}{' '}
                  <CopyIcon
                    onClick={e => {
                      e.stopPropagation();
                      onCopy(discount.code);
                    }}
                  />
                </p>
              </Grid>
            </>
          ) : (
            <>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">مقدار</p>
                <p className="value">٪ {formatNumber(discount?.amount)}</p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">سقف خرید</p>
                <p className="value"> {formatNumber(discount?.limit)} تومان</p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">از تاریخ</p>
                <p className="value">
                  {discount?.start_date
                    ? formatDate(discount?.start_date)
                    : '1400/5/5'}
                </p>
              </Grid>
              <Grid mt={2} container justifyContent="space-between">
                <p className="title">تا تاریخ</p>
                <p className="value">
                  {discount?.expire_date
                    ? formatDate(discount?.expire_date)
                    : '1400/5/5'}
                </p>
              </Grid>
              <Grid
                mt={2}
                className="code_container"
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <p className="title">کد تخفیف</p>
                <p className="value">
                  {discount?.code}{' '}
                  <IconButton>
                    <CopyIcon
                      onClick={e => {
                        e.stopPropagation();
                        onCopy(discount?.code);
                      }}
                    />
                  </IconButton>
                </p>
              </Grid>
            </>
          )}
        </AccordionDetails>
      </Accordion>
    </Style>
  );
};

export default DiscountCard;
