import React from 'react';

interface IProps {
  className?: string;
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
}

const AccordionItem = ({ leftColumn, rightColumn }: IProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-8 mb-6">
      <div>{leftColumn}</div>
      <div>{rightColumn}</div>
    </div>
  );
};

export default AccordionItem;
