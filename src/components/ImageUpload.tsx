import React from 'react';
import { FileState } from '../types';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { toast } from 'react-toastify';

export default function ImageUpload({
  onChange,
  setFileUrl,
  disabled,
}: {
  disabled?: boolean;
  onChange?: (fileState: FileState) => void;
  setFileUrl: (url: string) => void;
}): JSX.Element {
  const [fileState, setFileState] = React.useState<FileState | null>(null);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files || [])[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = String(reader.result);
      const state: FileState = {
        file,
        fileName: file.name,
        base64,
      };
      setFileState(state);
      onChange && onChange(state);
    };
  };

  return (
    <div className="">
      <input
        className="hidden"
        accept="image/png, image/jpeg"
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChangeFile}
        disabled={disabled}
      />
      <label htmlFor="contained-button-file" className={disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}>
        <div>Tải lên chứng chỉ</div>
        {fileState ? (
          <img src={fileState?.base64} alt="" className="max-w-[100px] min-w-[100px] aspect-square" />
        ) : (
          <div className="w-[100px] h-[100px] rounded bg-gray-200 text-gray-400 flex justify-center items-center">
            <AddPhotoAlternateIcon className="w-10 h-10" />
          </div>
        )}
      </label>
    </div>
  );
}

// //Card
// import Card from "@mui/core/Card";
// import CardActionArea from "@mui/core/CardActionArea";
// import CardHeader from "@mui/core/CardHeader";
// import CardContent from "@mui/core/CardContent";
// import CardActions from "@mui/core/CardActions";
// import CardMedia from "@mui/core/CardMedia";

// import Fab from "@mui/core/Fab";
// import Button from "@mui/core/Button";
// import Grid from "@mui/core/Grid";
// import Avatar from "@mui/core/Avatar";

// import red from "@mui/core/colors/red";
// import pink from "@mui/core/colors/pink";
// import blue from "@mui/core/colors/blue";

// import Icon from "@mui/core/Icon";
// import PageviewIcon from "@mui/icons/Pageview";
// import SearchIcon from "@mui/icons/Search";
// import AddPhotoAlternateIcon from "@mui/icons/AddPhotoAlternate";
// import CollectionsIcon from "@mui/icons/Collections";

// import Typography from "@mui/core/Typography";
// import Popover from "@mui/core/Popover";

// // Search
// import Paper from "@mui/core/Paper";
// import InputBase from "@mui/core/InputBase";
// import Divider from "@mui/core/Divider";
// import IconButton from "@mui/core/IconButton";
// import MenuIcon from "@mui/icons/Menu";
// import CloseIcon from "@mui/icons/Close";
// import ReplayIcon from "@mui/icons/Replay";

// //Tabs
// import { withStyles } from "@mui/core/styles";

// const imageGallery = [
//   "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
//   "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
//   "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
//   "https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg",
//   "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg",
//   "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg"
// ];

// const styles = theme => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "flex-end"
//   },
//   icon: {
//     margin: theme.spacing.unit * 2
//   },
//   iconHover: {
//     margin: theme.spacing.unit * 2,
//     "&:hover": {
//       color: red[800]
//     }
//   },
//   cardHeader: {
//     textalign: "center",
//     align: "center",
//     backgroundColor: "white"
//   },
//   input: {
//     display: "none"
//   },
//   title: {
//     color: blue[800],
//     fontWeight: "bold",
//     fontFamily: "Montserrat",
//     align: "center"
//   },
//   button: {
//     color: blue[900],
//     margin: 10
//   },
//   secondaryButton: {
//     color: "gray",
//     margin: 10
//   },
//   typography: {
//     margin: theme.spacing.unit * 2,
//     backgroundColor: "default"
//   },

//   searchRoot: {
//     padding: "2px 4px",
//     display: "flex",
//     alignItems: "center",
//     width: 400
//   },
//   searchInput: {
//     marginLeft: 8,
//     flex: 1
//   },
//   searchIconButton: {
//     padding: 10
//   },
//   searchDivider: {
//     width: 1,
//     height: 28,
//     margin: 4
//   }
// });

// class ImageUploadCard extends React.Component {
//   state = {
//     mainState: "initial", // initial, search, gallery, uploaded
//     imageUploaded: 0,
//     selectedFile: null
//   };

//   renderInitialState() {
//     const { classes, theme } = this.props;
//     const { value } = this.state;

//     return (
//       <React.Fragment>
//         <CardContent>
//           <Grid container justify="center" alignItems="center">
//             <input
//               accept="image/*"
//               className={classes.input}
//               id="contained-button-file"
//               multiple
//               type="file"
//               onChange={this.handleUploadClick}
//             />
//             <label htmlFor="contained-button-file">
//               <Fab component="span" className={classes.button}>
//                 <AddPhotoAlternateIcon />
//               </Fab>
//             </label>
//           </Grid>
//         </CardContent>
//       </React.Fragment>
//     );
//   }

//   renderUploadedState() {
//     const { classes, theme } = this.props;

//     return (
//       <React.Fragment>
//         <CardActionArea onClick={this.imageResetHandler}>
//           <img
//             width="100%"
//             className={classes.media}
//             src={this.state.selectedFile}
//             alt="1"
//           />
//         </CardActionArea>
//       </React.Fragment>
//     );
//   }

//   imageResetHandler = event => {
//     console.log("Click!");
//     this.setState({
//       mainState: "initial",
//       selectedFile: null,
//       imageUploaded: 0
//     });
//   };

//   render() {
//     const { classes, theme } = this.props;

//     return (
//       <React.Fragment>
//         <div className={classes.root}>
//           <Card className={this.props.cardName}>
//             {(this.state.mainState == "initial" && this.renderInitialState()) ||
//               (this.state.mainState == "uploaded" &&
//                 this.renderUploadedState())}
//           </Card>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default withStyles(styles, { withTheme: true })(ImageUploadCard);
