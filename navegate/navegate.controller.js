const guides = require("../guides/guides.controller");
const Projects = require("./navigate.dao");

exports.pageNavigation = (req, res) => {
  const userData = {
    user: req.params.id,
  };
  switch (req.params.key) {
    case "dashboard":
    case "connections":
      Projects.findOne({ _id: userData.user }, (err, user) => {
        if (err) return res.status(500).send("Error de servidor");
        if (!user) {
          return res.status(203).send({
            status: 2,
            message: "Nose ha podido acceder a la ruta",
            labelBtnDerecha: "Aceptar",
            stepId: "login",
          });
        } else {
          return res.send({
            status: 1,
            stepId: req.params.key,
            payload: {
              projects: user.projects,
            },
          });
        }
      });

      break;
    case "guides":
      guides.getGuides(req, res);
      break;

    default:
      res.status(203).send({
        status: 2,
        message: "Error redireccionando",
        labelBtnDerecha: "Aceptar",
        stepId: "login",
      });
      break;
  }
};
