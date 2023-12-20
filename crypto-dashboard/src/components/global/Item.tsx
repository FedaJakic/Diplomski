import { MenuItem } from "react-pro-sidebar";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { colors } from "../../util/theme/colors";

interface ItemProps{
    title: string 
    to: string
    icon: any
}

const Item: React.FC<ItemProps> = ({ title, to, icon }) => {
    return (
      <MenuItem
        icon={icon}
        style={{
          color: colors.grey[100],
        }}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

export default Item
