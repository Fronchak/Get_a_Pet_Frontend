import { ReactNode } from 'react';

type Props = {
  children: ReactNode[] | ReactNode;
}

const Container = (props: Props) => {
  return (
    <div className="container py-2 py-md-3 py-lg-4">
      { props.children }
    </div>
  );
}

export default Container;
