import Adw from "gi://Adw";
import Gio from "gi://Gio";
import GLib from "gi://GLib";
import GObject from "gi://GObject";

import { gettext as _ } from "gettext";

import Template from "./main-window.ui";

// FIXME: Choose a namespace that fits your app
const options = { GTypeName: "ExampleMainWindow", Template };

class MainWindow extends Adw.ApplicationWindow {
  private readonly _settings = Gio.Settings.new(Config.APP_ID);

  public constructor(props?: Partial<Adw.ApplicationWindow.ConstructorProps>) {
    super(props);

    this.set_default_size(
      this._settings.get_int("window-width"),
      this._settings.get_int("window-height"),
    );

    if (this._settings.get_boolean("maximized")) {
      this.maximize();
    }

    this.add_action_entries([
      { activate: this.showAboutDialog.bind(this), name: "show-about-dialog" },
    ]);
  }

  static {
    GObject.registerClass(options, this);
  }

  public override vfunc_close_request(): boolean {
    const [width, height] = this.get_default_size();
    this._settings.set_int("window-width", width);
    this._settings.set_int("window-height", height);

    this._settings.set_boolean("maximized", this.is_maximized());

    return super.vfunc_close_request();
  }

  private showAboutDialog(): void {
    // FIXME: Update the info here to something that fits your project

    const dialog = new Adw.AboutDialog({
      applicationIcon: Config.APP_ID,
      applicationName: GLib.get_application_name() ?? "",
      copyright: "© 2025 [nyx]",
      developerName: "[nyx]",
      developers: ["[nyx] https://nyx.liber.ar/"],
      issueUrl: "https://codeberg.org/nyx_lyb3ra/gnome-ts-template/issues",
      license: _(
        "This application comes with absolutely no warranty. See the <a href='https://blueoakcouncil.org/license/1.0.0'>Blue Oak Model License 1.0.0</a> for details.",
      ),
      translatorCredits: _("translator-credits"),
      version: Config.VERSION,
    });

    dialog.present(this);
  }
}

export default MainWindow;
