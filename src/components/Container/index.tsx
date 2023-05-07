import { ReactNode } from 'react';
import './styles.css';

type Props = {
  children: ReactNode[] | ReactNode;
}

const Container = (props: Props) => {
  return (
    <div className="container py-2 py-md-3 py-lg-4" id="main-container">
      { props.children }
    </div>
  );
}

export default Container;
