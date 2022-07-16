import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = (Component) => {
  // HOC to use the react router dom hooks in class components as they deprecated all the class components 
  // the implementation of the HOC is from the official react router dom docs
  const ComponentWithRouterProp = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
  return ComponentWithRouterProp;
};

export default withRouter;
