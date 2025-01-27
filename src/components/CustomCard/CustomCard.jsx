import {
  Typography,
  CardContent,
  CardMedia,
  CardActions,
  Card,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const dummyImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyqtRk3csjRytPXntUK-eClQjrc3NVTLNuDA&s";

export const CustomCard = (props) => {
  const {
    image = dummyImage,
    imageAlt,
    cardHeading,
    cardDescription,
    onClickFavortite,
    onViewDetail,
  } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title={imageAlt} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {cardHeading}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {cardDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="add to favorites" onClick={onClickFavortite}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="detail" onClick={onViewDetail}>
          <RemoveRedEyeIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
