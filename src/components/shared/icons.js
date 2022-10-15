import {
  AiOutlineCheckCircle,
  AiOutlinePlus,
  AiOutlineStar
} from "react-icons/ai";
import { BiArrowBack, BiSearch } from "react-icons/bi";
import { BsFillCameraFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaFileDownload, FaFilter } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import location from '../../assets/images/location.svg';
import men from "../../assets/images/men.svg";
import notification from "../../assets/images/notification.svg";
import right from "../../assets/images/right.svg";
import threeBar from "../../assets/images/threeBar.svg";
import tooltip from "../../assets/images/tooltip.svg";
import wrong from "../../assets/images/wrong.svg";

const icons = {
  arrowDown: MdKeyboardArrowDown,
  notification,
  threeBar,
  grClose: IoClose,
  threeBarIcon: BsThreeDotsVertical,
  // threeBar: GoThreeBars,
  search: BiSearch,
  plus: AiOutlinePlus,
  filter: FaFilter,
  star: AiOutlineStar,
  camera: BsFillCameraFill,
  checkCircle: AiOutlineCheckCircle,
  closeCircle: IoIosCloseCircleOutline,
  check: AiOutlineCheckCircle,
  arrowLeft: BiArrowBack,
  right: right,
  wrong: wrong,
  men: men,
  tooltip: tooltip,
  fileDownload: FaFileDownload,
  location:location
};

export default icons;
