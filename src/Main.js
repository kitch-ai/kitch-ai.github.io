import { useLocation } from "react-router-dom";
import Invite from './Invite';
import Marketing from './Marketing';

const Main = () => {
  const squery = useLocation().search;
  const params = new URLSearchParams(squery);
  const invitedby = params.get("invitedby");

  if (squery != "" && invitedby != null) {
    return <Invite fromEmail={invitedby} />
  } else {
    return <Marketing />
  }
}

export default Main;
