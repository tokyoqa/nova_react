import {Card, CardContent, Typography, CardActions} from "@mui/material";

const cardStyle = {
    display: "block",
    transitionDuration: "0.3s",
    height: "200px",
    width: "95%",
    margin: "0 auto",
    marginTop: "30px"
  };

function NotFound() {
  return (
    <div>
     <Card style={cardStyle}>
          <CardContent>
            <Typography sx={{textAlign: 'center'}} gutterBottom variant="h5" component="p">
              Удаленная Идентификация
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{fontSize: "16px", textAlign: 'text-justify', marginTop: '10px'}}>
              Ошибка. Страница не найдена!
            </Typography>
          </CardContent>
        <CardActions >
        </CardActions>
      </Card>
  </div>
);
}

export default NotFound;