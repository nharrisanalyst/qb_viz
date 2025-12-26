import { Children, PropsWithChildren } from "react";

type TitleAndChildrenProps = {
    title:string;
}

type TitleAndChildrenPropsWithChildren = PropsWithChildren<TitleAndChildrenProps>;

const TitleAndChildren =({title, children}:TitleAndChildrenPropsWithChildren)=>(
    <div>
       <div>{title}</div>
       {children}
    </div>
)


export default TitleAndChildren;