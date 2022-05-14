import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { COLOR } from '../../../constants';

const ToggleStar = ({ checked, onClick }: { checked?: boolean; onClick: () => void }) => {
  return (
    <div onClick={onClick}>
      {checked ? <StarIcon sx={{ color: COLOR.myYellow }} /> : <StarBorderIcon sx={{ color: COLOR.myYellow }} />}
    </div>
  );
};

export default ToggleStar;
