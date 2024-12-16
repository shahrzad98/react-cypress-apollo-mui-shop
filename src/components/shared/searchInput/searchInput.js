import React from 'react';
import classes from './styles.module.css';

const SearchInput = ({
  isProduct,
  value,
  onClear,
  onChange,
  onFocus,
  onBlur,
  isFocused,
  isCategory,
  isVoucher,
  isFinance
}) => {
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <input
        data-cy="search_input"
        onFocus={onFocus}
        onBlur={onBlur}
        className={classes.inputUnF}
        value={value}
        onChange={onChange}
        placeholder={
          isFinance
            ? 'جستجو در بین سوابق'
            : isVoucher
            ? 'جستجو در بین تخفیف ها'
            : isCategory
            ? 'جستجو در بین دسته بندی ها'
            : isProduct
            ? 'جستجو در محصول ها'
            : 'جستجو در بین سفارش ها'
        }
      />
      <i
        onClick={() => {
          onClear?.();
        }}
        style={{
          position: 'absolute',
          right: '15px',
          fontSize: '16px',
          top: '15px',
          color: '#9FA6B9'
        }}
        className={value?.length !== 0 || isFocused ? 'df-arrow' : 'df-search'}
      />
      {(value?.length > 0 || isFocused) && (
        <i
          onClick={() => {
            onClear?.();
          }}
          style={{
            position: 'absolute',
            left: '15px',
            fontSize: '16px',
            top: '15px',
            color: '#9FA6B9'
          }}
          className="df-close"
        />
      )}
    </div>
  );
};

export default SearchInput;
