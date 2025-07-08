import winston from "winston";

const timezoned = () =>
	new Date()
		.toLocaleString("pt-BR", {
			timeZone: "America/Sao_Paulo",
			hour12: false,
			timeZoneName: "short",
		})
		.replace(",", "");

export const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.timestamp({ format: timezoned }),
		winston.format.json(),
	),

	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp({ format: timezoned }),
				winston.format.errors({ stack: true }),
				winston.format.printf(
					(info) =>
						`[${info.timestamp}] ${info.level}: ${info.message}${info.stack ? `\n${info.stack}` : ""}`,
				),
			),
		}),

		new winston.transports.File({ filename: "error.log", level: "error" }),
		new winston.transports.File({ filename: "combined.log" }),
	],
});
