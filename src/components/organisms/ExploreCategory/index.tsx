import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useQuery } from "@apollo/client";
import { CATEGORY_LIST } from "../../../graphql";
import { CategoryType } from "../../../Types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  categoryContainer: {
    margin: "1em 0",
  },
});

interface Props {
  changeHandler: (categoryId: string) => void;
}

const ExploreCategory: React.FC<Props> = ({ changeHandler }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { loading, data, error } = useQuery(CATEGORY_LIST);
  const btnRef = React.createRef();
  const styles = useStyles();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (categoryId: string) => {
    changeHandler(categoryId);
    handleClose();
  };

  if (error) return null;
  return (
    <div className={styles.categoryContainer}>
      <Button
        color="primary"
        variant="contained"
        endIcon={<ExpandMoreIcon fontSize="large" />}
        onClick={(event) => handleClick(event)}
        disabled={Boolean(error)}
      >
        Shop By Category
      </Button>
      <Menu
        ref={btnRef}
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={() => handleCategoryClick("")}>All</MenuItem>
        {loading ? (
          <CircularProgress />
        ) : (
          data.allCategories.map(
            ({ categoryId, name }: CategoryType): JSX.Element => (
              <MenuItem
                key={categoryId}
                onClick={() => handleCategoryClick(categoryId)}
              >
                {name}
              </MenuItem>
            )
          )
        )}
      </Menu>
    </div>
  );
};

export default ExploreCategory;
