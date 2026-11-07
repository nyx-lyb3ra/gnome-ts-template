import Adw from "gi://Adw";
import GLib from "gi://GLib";
import GObject from "gi://GObject";

import MainWindow from "./main-window.js";

// FIXME: Choose a namespace that fits your app
const options = { GTypeName: "ExampleApp" };

class App extends Adw.Application {
  static {
    GObject.registerClass(options, this);
  }

  public quit(): void {
    super.quit();
  }

  public override vfunc_activate(): void {
    this.activeWindow?.present();
  }

  public override vfunc_startup(): void {
    super.vfunc_startup();

    // FIXME: Update this with your app name
    GLib.set_application_name("GNOME TypeScript Template");
    GLib.set_prgname("gnome-ts-template");

    this.add_action_entries([{ activate: this.quit.bind(this), name: "quit" }]);
    this.set_accels_for_action("app.quit", ["<Ctrl>Q"]);
    this.set_accels_for_action("window.close", ["<Ctrl>W"]);

    new MainWindow({ application: this });
  }
}

export default App;
