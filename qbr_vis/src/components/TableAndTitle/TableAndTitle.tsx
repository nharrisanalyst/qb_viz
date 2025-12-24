import QBTable from '../QBTable/QBTable';
import TableTitle from '../TableTitle/TableTitle';
import type { ColumnDef } from '@tanstack/react-table';

import './tableTitle.scss'

type TableAndTitleProps = {
    name:string;
    titleText:string
    data:object[];
    columns:ColumnDef<object>[];
}

const TableAndTitle = ({name, titleText, data, columns}:TableAndTitleProps)=>(
    <div className='table-title-cont'>
        <TableTitle name={name} text={titleText} />
        <QBTable data={data} columns={columns} />
    </div>
)

export default TableAndTitle;