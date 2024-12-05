// import Room from "./Room";
import DownloadData from "./DownloadData";
import DDataFormat from "./DDataformat";
import CardContainer from "./CardContainer";
import RulesCard from "../element/RulesCard";

const Content = () => {
  return (
    <div className="m-auto flex gap-10 p-20 flex-col justify-evenly">
      <div className="flex justify-center gap-5">
        <DownloadData deviceId={1} />
        <DDataFormat deviceId={1} />
      </div>
      <RulesCard />
      <CardContainer />
    </div>
  );
};

export default Content;
