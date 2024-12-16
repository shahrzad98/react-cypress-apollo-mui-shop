import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid
} from '@mui/material';

const Style = styled(Grid)({
  '& .MuiPaper-root': {
    boxShadow: '0 2px 8px 0 rgb(72 52 147 / 8%)',
    borderRadius: '10px !important'
  },
  '& .MuiAccordionSummary-root': {
    padding: '5px 22px',
    marginTop: '1rem'
  },
  '& .acc--title': {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0'
  },
  '& .df-arrow': {
    transform: 'rotate(90deg)',
    fontWeight: 'bold',
    color: '#000'
  }
});

const ToggleBox = ({ name, children, onExpand, isProduct, onCollapse }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (ev, isExpanded) => {
    setExpanded(isExpanded);
  };

  useEffect(() => {
    if (expanded) onExpand?.();
    if (!expanded) onCollapse?.();
  }, [expanded]);

  return (
    <Style>
      <Accordion onChange={handleChange}>
        <AccordionSummary
          expandIcon={<i style={{ fontSize: '17px' }} className="df-arrow" />}>
          <p
            style={{ color: isProduct ? '#6A6F80' : '' }}
            className="acc--title">
            {name}
          </p>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </Style>
  );
};

export default ToggleBox;
