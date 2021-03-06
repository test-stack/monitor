import React, { Component } from "react";
import { connect } from "react-redux";
import {
  allowSlotValidator,
  disallowSlotValidator,
  fetchSettingsFromServer,
  progressSettingsSaveSuccess,
  progressSettingsSaveFailed,
  progressSettingsSaveReset
} from "../actions";
import SettingsPage from "../components/SettingsPage";

const SettingsContainer = class SettingsContainer extends Component {
  constructor(props) {
    super(props);
    this.saveSettings = this.saveSettings.bind(this);
  }
  componentDidMount() {
    fetch("/api/settings", {
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.elastic.responses[0].hits !== undefined) {
          let settings = data.elastic.responses[0].hits.hits;
          this.props.fetchSettingsFromServer(settings);
        }
      });
  }

  saveSettings = settings => {
    let payload = {
      generatorSlotValidatorAllow: settings.allowSlotValidator
    };

    fetch("/api/settings", {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: "PUT",
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        if (data.elastic._shards.successful === 1) {
          this.props.progressSettingsSaveSuccess(
            "Settings successfully saved."
          );
        } else {
          this.props.progressSettingsSaveFailed("Settings not saved.");
        }
        setTimeout(() => {
          this.props.progressSettingsSaveReset();
        }, 3000);
      })
      .catch(err => {
        if (settings.allowSlotValidator) {
          this.props.disallowSlotValidator();
        } else {
          this.props.allowSlotValidator();
        }
      });
  };

  render() {
    return (
      <div id="settingsContainer">
        <SettingsPage
          allowSlotValidator={this.props.getStateAllowSlotValidator}
          saveSettings={this.saveSettings}
        />
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSettingsFromServer: settings => {
      dispatch(fetchSettingsFromServer(settings));
    },
    allowSlotValidator: () => {
      dispatch(allowSlotValidator());
    },
    disallowSlotValidator: () => {
      dispatch(disallowSlotValidator());
    },
    progressSettingsSaveSuccess: message => {
      dispatch(progressSettingsSaveSuccess(message));
    },
    progressSettingsSaveFailed: message => {
      dispatch(progressSettingsSaveFailed(message));
    },
    progressSettingsSaveReset: () => {
      dispatch(progressSettingsSaveReset());
    }
  };
};

export default connect(null, mapDispatchToProps)(SettingsContainer);
