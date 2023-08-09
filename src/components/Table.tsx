import React from 'react';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export const Table: React.FC<TableProps> = React.memo(({ className }) => {
	return <div className={className}>bobek</div>;
});
