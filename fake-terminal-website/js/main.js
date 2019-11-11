/**
 * Configs
 */

var self;

var configs = (function () {
    var instance;
    var Singleton = function (options) {
        var options = options || Singleton.defaultOptions;
        for (var key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        general_help: "Below there's a list of commands that you can use.\nYou can use autofill by pressing the TAB key, autocompleting if there's only 1 possibility, or showing you a list of possibilities.",
        ls_help: "List information about the files and folders (the current directory by default).",
        cat_help: "Read FILE(s) content and print it to the standard output (screen).",
        whoami_help: "Print the user name associated with the current effective user ID and more info.",
        date_help: "Print the system date and time.",
        help_help: "Print this menu.",
        clear_help: "Clear the terminal screen.",
        reboot_help: "Reboot the system.",
        cd_help: "Change the current working directory.",
        mv_help: "Move (rename) files.",
        rm_help: "Remove files or directories.",
        rmdir_help: "Remove directory, this command will only work if the folders are empty.",
        touch_help: "Change file timestamps. If the file doesn't exist, it's created an empty one.",
        sudo_help: "Execute a command as the superuser.",
        welcome: "Welcome to FTW (Fake Terminal Website)! :)\nIn order for you to start customizing the texts, go to js/main.js and replace the texts located at the configs var.\nIn that same file, you can define all the fake files you want as well as their content. This files will appear on the sidenav.\nAlso, don't forget to change the colors on the css/main.css file as well as the website title on the index.html file.\nNow in order to get started, feel free to either execute the 'help' command or use the more user-friendly colored sidenav at your left.\nIn order to skip text rolling, double click/touch anywhere.",
        internet_explorer_warning: "NOTE: I see you're using internet explorer, this website won't work properly.",
        welcome_file_name: "welcome_message.txt",
        invalid_command_message: "<value>: command not found.",
        reboot_message: "Preparing to reboot...\n\n3...\n\n2...\n\n1...\n\nRebooting...\n\n",
        permission_denied_message: "Unable to '<value>', permission denied.",
        sudo_message: "Unable to sudo using a web client.",
        usage: "Usage",
        file: "file",
        file_not_found: "File '<value>' not found.",
        username: "Username",
        hostname: "Host",
        platform: "Platform",
        accesible_cores: "Accessible cores",
        language: "Language",
        value_token: "<value>",
        host: "example.com",
        user: "guest",
        login_successfull: "Successfully logged in as '<value>'",
        is_root: false,
        type_delay: 20
    };
    return {
        getInstance: function (options) {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

/**
 * Your files here
 */
var files = (function () {
    var instance;
    var Singleton = function (options) {
        var options = options || Singleton.defaultOptions;
        for (var key in Singleton.defaultOptions) {
            this[key] = options[key] || Singleton.defaultOptions[key];
        }
    };
    Singleton.defaultOptions = {
        "about.txt": "This website was made using only pure JavaScript with no extra libraries.\nI made it dynamic so anyone can use it, just download it from GitHub and change the config text according to your needs.\nIf you manage to find any bugs or security issues feel free to email me: luisbraganca@protonmail.com",
        "getting_started.txt": "First, go to js/main.js and replace all the text on both singleton vars.\n- configs: All the text used on the website.\n- files: All the fake files used on the website. These files are also used to be listed on the sidenav.\nAlso please notice if a file content is a raw URL, when clicked/concatenated it will be opened on a new tab.\nDon't forget also to:\n- Change the page title on the index.html file\n- Change the website color on the css/main.css\n- Change the images located at the img folder. The suggested sizes are 150x150 for the avatar and 32x32/16x16 for the favicon.",
        "contact.txt": "mail@example.com",
        "social_network_1.txt": "https://www.socialite.com/username/",
        "social_network_2.txt": "https://example.com/profile/9382/"
    };
    return {
        getInstance: function (options) {
            instance === void 0 && (instance = new Singleton(options));
            return instance;
        }
    };
})();

var main = (function () {

    /**
     * Aux functions
     */
    var isUsingIE = window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./);

    var ignoreEvent = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    
    var scrollToBottom = function () {
        window.scrollTo(0, document.body.scrollHeight);
    };
    
    var isURL = function (str) {
        return (str.startsWith("http") || str.startsWith("www")) && str.indexOf(" ") === -1 && str.indexOf("\n") === -1;
    };
    
    /**
     * Model
     */
    var InvalidArgumentException = function (message) {
        this.message = message;
        // Use V8's native method if available, otherwise fallback
        if ("captureStackTrace" in Error) {
            Error.captureStackTrace(this, InvalidArgumentException);
        } else {
            this.stack = (new Error()).stack;
        }
    };
    // Extends Error
    InvalidArgumentException.prototype = Object.create(Error.prototype);
    InvalidArgumentException.prototype.name = "InvalidArgumentException";
    InvalidArgumentException.prototype.constructor = InvalidArgumentException;
	
	var cmds = [
		{
			alias: ["clear", "cls", "clearscreen"],
			help: "Clears the screen.",
			function: "CLEAR"
		},
		{
			alias: ["ls", "list"],
			help: "List information about the files and folders (the current directory by default).",
			function: "LS"
		},
		{
			alias: ["help"],
            help: "Print this menu.",
			function: "HELP"
        },
		{
			alias: ["whoami", "who"],
            help: "Print the user name associated with the current effective user ID and more info.",
			function: "WHOAMI"
		},
		{
			alias: ["cat"],
			help: "Read FILE(s) content and print it to the standard output (screen).",
			function: "CAT"
		},
		{
			alias: ["date"],
			help: "Print the system date and time.",
			function: "DATE"
		},
		{
			alias: ["reboot"],
			help: "Reboot the system.",
			function: "REBOOT"
		},
		{
			alias: ["cd"],
			help: "Change the current working directory.",
			function: "CD"
		},
		{
			alias: ["mv"],
			help: "Move (rename) files.",
			function: "MV"
		},
		{
			alias: ["rm"],
			help: "Remove files or directories.",
			function: "RM"
		},
		{
			alias: ["rmdir"],
			help: "Remove directory, this command will only work if the folders are empty.",
			function: "RMDIR"
		},
		{
			alias: ["touch", "tch"],
			help: "Change file timestamps. If the file doesn't exist, it's created an empty one.",
			function: "TOUCH"
		},
		{
			alias: ["sudo"],
			help: "Execute a command as the superuser.",
			function: "SUDO"
		},
		{
			alias: ["login"],
			help: "Login.",
			function: "LOGIN"
		}
	];
	
    /*var cmds = {
        LS: { value: "ls", help: configs.getInstance().ls_help },
        CAT: { value: "cat", help: configs.getInstance().cat_help },
        WHOAMI: { value: "whoami", help: configs.getInstance().whoami_help },
        DATE: { value: "date", help: configs.getInstance().date_help },
        HELP: { value: "help", help: configs.getInstance().help_help },
        CLEAR: { value: ["clear", "cls"], help: configs.getInstance().clear_help },
        REBOOT: { value: "reboot", help: configs.getInstance().reboot_help },
        CD: { value: "cd", help: configs.getInstance().cd_help },
        MV: { value: "mv", help: configs.getInstance().mv_help },
        RM: { value: "rm", help: configs.getInstance().rm_help },
        RMDIR: { value: "rmdir", help: configs.getInstance().rmdir_help },
        TOUCH: { value: "touch", help: configs.getInstance().touch_help },
        SUDO: { value: "sudo", help: configs.getInstance().sudo_help }
    };*/

    var Terminal = function (prompt, cmdLine, output, user, host, root, outputTimer) {
        if (!(prompt instanceof Node) || prompt.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + prompt + " for argument 'prompt'.");
        }
        if (!(cmdLine instanceof Node) || cmdLine.nodeName.toUpperCase() !== "INPUT") {
            throw new InvalidArgumentException("Invalid value " + cmdLine + " for argument 'cmdLine'.");
        }
        if (!(output instanceof Node) || output.nodeName.toUpperCase() !== "DIV") {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
		this.completePrompt = user + "@" + host + ":~" + (root ? "#" : "$");
        this.prompt = prompt;
        this.cmdLine = cmdLine;
        this.output = output;
        this.typeSimulator = new TypeSimulator(outputTimer, output);
		self = this;
    };

    Terminal.prototype.setCredentials = function (user, host) {
        this.completePrompt = user + "@" + host + ":~" + (this.root ? "#" : "$");
        console.log(this.completePrompt);
    }

    Terminal.prototype.type = function (text, callback) {
        if (isURL(text)) {
            window.open(text);
        }
        var i = 0;
        var output = document.getElementById("output");
        var timer = this.timer;
        var skipped = false;
        var skip = function () {
            skipped = true;
        }.bind(this);
        document.addEventListener("dblclick", skip);
        (function typer() {
            if (i < text.length) {
                var char = text.charAt(i);
                var isNewLine = char === "\n";
                output.innerHTML += isNewLine ? "<br/>" : char;
                i++;
                if (!skipped) {
                    setTimeout(typer, isNewLine ? timer * 2 : timer);
                } else {
                    output.innerHTML += (text.substring(i).replace(new RegExp("\n", 'g'), "<br/>")) + "<br/>";
                    document.removeEventListener("dblclick", skip);
                    callback();
                }
            } else if (callback) {
                output.innerHTML += "<br/>";
                document.removeEventListener("dblclick", skip);
                callback();
            }
            scrollToBottom();
        })();
    };

    Terminal.prototype.exec = function () {
        var command = this.cmdLine.value;
        this.cmdLine.value = "";
        this.prompt.textContent = "";
        this.output.innerHTML += "<span class=\"prompt-color\">" + this.completePrompt + "</span> " + command + "<br/>";
    };

    Terminal.prototype.init = function () {
        this.cmdLine.disabled = true;
        this.lock(); // Need to lock here since the sidenav elements were just added
        this.cmdLine.addEventListener("keydown", function (event) {
            if (event.which === 13 || event.keyCode === 13) {
                this.handleCmd();
                ignoreEvent(event);
            } else if (event.which === 9 || event.keyCode === 9) {
                //this.handleFill();
                ignoreEvent(event);
            }
        }.bind(this));
        this.reset();
    };

    Terminal.prototype.lock = function () {
        this.exec();
        this.cmdLine.blur();
        this.cmdLine.disabled = true;
    };

    Terminal.prototype.unlock = function () {
        self.cmdLine.disabled = false;
        self.prompt.textContent = self.completePrompt;
        scrollToBottom();
        this.focus();
    };

    Terminal.prototype.handleFill = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        if ((cmdComponents.length <= 1) || (cmdComponents.length === 2 && cmdComponents[0] === cmds.CAT.value)) {
            this.lock();
            var possibilities = [];
            if (cmdComponents[0].toLowerCase() === cmds.CAT.value) {
                if (cmdComponents.length === 1) {
                    cmdComponents[1] = "";
                }
                if (configs.getInstance().welcome_file_name.startsWith(cmdComponents[1].toLowerCase())) {
                    possibilities.push(cmds.CAT.value + " " + configs.getInstance().welcome_file_name);
                }
                for (var file in files.getInstance()) {
                    if (file.startsWith(cmdComponents[1].toLowerCase())) {
                        possibilities.push(cmds.CAT.value + " " + file);
                    }
                }
            } else {
                for (var command in cmds) {
                    if (cmds[command].value.startsWith(cmdComponents[0].toLowerCase())) {
                        possibilities.push(cmds[command].value);
                    }
                }
            }
            if (possibilities.length === 1) {
                this.cmdLine.value = possibilities[0] + " ";
                this.unlock();
            } else if (possibilities.length > 1) {
                this.type(possibilities.join("\n"), function () {
                    this.cmdLine.value = cmdComponents.join(" ");
                    this.unlock();
                }.bind(this));
            } else {
                this.cmdLine.value = cmdComponents.join(" ");
                this.unlock();
            }
        }
    };

    Terminal.prototype.handleCmd = function () {
        var cmdComponents = this.cmdLine.value.trim().split(" ");
        var acceptedCommand = false;
        this.lock();
		cmds.forEach(command => {
			if(Array.isArray(command.alias)) {
				command.alias.forEach(al => {
					if(al.toLowerCase() == cmdComponents[0].toLowerCase()) {
                        acceptedCommand = true;
                        self.runCmd(command.function, cmdComponents);
					}
				});
            } else {
                this.invalidCommand(" ");
            }
            /*
            Always use Arrays for command alias, even if only one alias
            
            else {
				if(command.alias == cmdComponents[0]) {
					self.runCmd(command.function, cmdComponents);
				}
            }*/
		});
		if(cmdComponents[0] == "") {
			this.invalidCommand(" ");
		} else if (!acceptedCommand) {
            this.invalidCommand(cmdComponents);
        }
    }
			
	Terminal.prototype.runCmd = function(cmd, args) {
	switch (cmd) {
            case "CAT":
                this.cat(args);
                break;
            case "LS":
                this.ls();
                break;
            case "WHOAMI":
                this.whoami();
                break;
            case "DATE":
                this.date();
                break;
            case "HELP":
                this.help();
                break;
            case "CLEAR":
                this.clear();
                break;
            case "REBOOT":
                this.reboot();
                break;
            case "CD":
            case "MV":
            case "RMDIR":
            case "RM":
            case "TOUCH":
                this.permissionDenied(args);
                break;
            case "SUDO":
                this.sudo();
                break;
            case "LOGIN":
                this.login(args);
                break;
            default:
                this.invalidCommand(args);
                break;
	}
}
			
    Terminal.prototype.cat = function (cmdComponents) {
        var result;
        if (cmdComponents.length <= 1) {
            result = configs.getInstance().usage + ": " + cmds.CAT.value + " <" + configs.getInstance().file + ">";
        } else if (!cmdComponents[1] || (!cmdComponents[1] === configs.getInstance().welcome_file_name || !files.getInstance().hasOwnProperty(cmdComponents[1]))) {
            result = configs.getInstance().file_not_found.replace(configs.getInstance().value_token, cmdComponents[1]);
        } else {
            result = cmdComponents[1] === configs.getInstance().welcome_file_name ? configs.getInstance().welcome : files.getInstance()[cmdComponents[1]];
        }
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.ls = function () {
        var result = ".\n..\n" + configs.getInstance().welcome_file_name + "\n";
        for (var file in files.getInstance()) {
            result += file + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.sudo = function () {
        this.type(configs.getInstance().sudo_message, this.unlock.bind(this));
    }

    Terminal.prototype.whoami = function (cmdComponents) {
        var result = configs.getInstance().username + ": " + configs.getInstance().user + "\n" + configs.getInstance().hostname + ": " + configs.getInstance().host + "\n" + configs.getInstance().platform + ": " + navigator.platform + "\n" + configs.getInstance().accesible_cores + ": " + navigator.hardwareConcurrency + "\n" + configs.getInstance().language + ": " + navigator.language;
        this.type(result, this.unlock.bind(this));
    };

    Terminal.prototype.date = function (cmdComponents) {
        this.type(new Date().toString(), this.unlock.bind(this));
    };

    Terminal.prototype.help = function () {
        var result = configs.getInstance().general_help + "\n\n";
        for (var cmd in cmds) {
            result += cmds[cmd].alias[0] + " - " + cmds[cmd].help + "\n";
        }
        this.type(result.trim(), this.unlock.bind(this));
    };

    Terminal.prototype.clear = function () {
		this.output = document.getElementById("output");
		this.prompt = document.getElementById("prompt");
        this.output.textContent = "";
        this.prompt.textContent = this.completePrompt;
        this.unlock();
    };

    Terminal.prototype.reboot = function () {
        this.type(configs.getInstance().reboot_message, this.reset.bind(this));
    };

    Terminal.prototype.login = function (args) {
        configs.getInstance().user = args[1];
        configs.getInstance().host = Math.floor(Math.random() * 255 + 1) + "." + Math.floor(Math.random() * 255 + 1) + "." + Math.floor(Math.random() * 255 + 1) + "." + Math.floor(Math.random() * 255 + 1);
        this.type(configs.getInstance().login_successfull.replace(configs.getInstance().value_token, configs.getInstance().user), this.unlock.bind(this));
        this.setCredentials(configs.getInstance().user, configs.getInstance().host);
    };

    Terminal.prototype.reset = function () {
        this.output.textContent = "";
        this.prompt.textContent = "";
        if (this.typeSimulator) {
            this.type(configs.getInstance().welcome + (isUsingIE ? "\n" + configs.getInstance().internet_explorer_warning : ""), function () {
                this.unlock();
            }.bind(this));
        }
    };

    Terminal.prototype.permissionDenied = function (cmdComponents) {
        this.type(configs.getInstance().permission_denied_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.invalidCommand = function (cmdComponents) {
        this.type(configs.getInstance().invalid_command_message.replace(configs.getInstance().value_token, cmdComponents[0]), this.unlock.bind(this));
    };

    Terminal.prototype.focus = function () {
        self.cmdLine.focus();
    };

    var TypeSimulator = function (timer, output) {
        var timer = parseInt(timer);
        if (timer === Number.NaN || timer < 0) {
            throw new InvalidArgumentException("Invalid value " + timer + " for argument 'timer'.");
        }
        if (!(output instanceof Node)) {
            throw new InvalidArgumentException("Invalid value " + output + " for argument 'output'.");
        }
        this.timer = timer;
        this.output = output;
    };

    TypeSimulator.prototype.type = function (text, callback) {
        if (isURL(text)) {
            window.open(text);
        }
        var i = 0;
        var output = this.output;
        var timer = this.timer;
        var skipped = false;
        var skip = function () {
            skipped = true;
        }.bind(this);
        document.addEventListener("dblclick", skip);
        (function typer() {
            if (i < text.length) {
                var char = text.charAt(i);
                var isNewLine = char === "\n";
                output.innerHTML += isNewLine ? "<br/>" : char;
                i++;
                if (!skipped) {
                    setTimeout(typer, isNewLine ? timer * 2 : timer);
                } else {
                    output.innerHTML += (text.substring(i).replace(new RegExp("\n", 'g'), "<br/>")) + "<br/>";
                    document.removeEventListener("dblclick", skip);
                    callback();
                }
            } else if (callback) {
                output.innerHTML += "<br/>";
                document.removeEventListener("dblclick", skip);
                callback();
            }
            scrollToBottom();
        })();
    };

    return {
        listener: function () {
            new Terminal(
                document.getElementById("prompt"),
                document.getElementById("cmdline"),
                document.getElementById("output"),
                configs.getInstance().user,
                configs.getInstance().host,
                configs.getInstance().is_root,
                configs.getInstance().type_delay
            ).init();
        }
    };
})();

window.onload = main.listener;