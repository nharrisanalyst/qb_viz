import './tableTitle.scss'

type TableTitleProps ={
    name:string;
    text:string;
}


const TableTitle = ({name, text}:TableTitleProps) =>(
    <span className='table-title'>
        { text } <span className='table-title-name'>{name}</span>
    </span>
)


export default TableTitle;