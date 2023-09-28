import "dotenv/config";

export const appEnvs = {
  porta: process.env.PORT as string,
  ambiente: process.env.NODE_ENV as string,
};
