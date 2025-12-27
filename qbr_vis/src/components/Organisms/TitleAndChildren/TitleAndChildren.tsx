import type { PropsWithChildren } from "react";
import './titleAndChildren.scss'

type TitleAndChildrenProps = {
    title:string;
}

type TitleAndChildrenPropsWithChildren = PropsWithChildren<TitleAndChildrenProps>;

const TitleAndChildren =({title, children}:TitleAndChildrenPropsWithChildren)=>(
    
    <div className='component-title-cont'>
       <div className='component-title-title'>{title}</div>
       
       {children}
    </div>
    
)


export default TitleAndChildren;