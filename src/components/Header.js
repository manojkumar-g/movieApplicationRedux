
import React from 'react';
import AppBar from 'material-ui/AppBar';
//header componet
export default class MainAppBar extends React.Component{
  render(){
    return(
      <AppBar
      title="Movie App"
      showMenuIconButton = {false}
      />
    );

  }
}
