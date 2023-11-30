import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

// import bodyParser from "body-parser";
import authRouter from './router/authRouter.js';
import clientRouter from './router/clientsRouter.js';
import advertiserRouter from './router/advertiserRouter.js';
import campaignRouter from './router/campaignRouter.js';
import placementRouter from './router/placementRouter.js';
import dictionaryRouter from './router/dictionaryRouter.js';
import creativeRouter from './router/creativeRouter.js';
import audienceRouter from './router/audienceRouter.js';
import thirdPartyAudienceRouter from './router/third-party-audienceRouter.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import componentsSchema from './doc/index.js';

// cors options
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://smashcode-ribeye.netlify.app',
    'https://smashcode-new-ribeye.netlify.app',
    'https://smashcode-ribeyeadminpanel.netlify.app',
  ],
  optionsSuccessStatus: 200,
};

// create application/json parser
// let jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
// let urlencodedParser = bodyParser.urlencoded({ extended: false })

/* CONFIGURATION */
dotenv.config({ path: './config.env' });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(express.urlencoded({ extended: false }));
// app.use(jsonParser);
// app.use(urlencodedParser);
app.use(cors(corsOptions));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Smashcode-Ribeye-backend',
      version: '1.0.0',
      description: '',
      license: {
        name: 'MIT',
      },
      contact: {
        name: 'smashcode',
        email: 'smashcode.dev@gmail.com',
        url: 'https://smashcode.dev/contact',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
      {
        url: 'https://ribeye-one.vercel.app/api/v1',
      },
    ],
    components: { ...componentsSchema },
  },
  apis: ['./router/*.js'], // Replace this with the path to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// API DOC ROUTE
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROUTES
app.use('/api/v1/', dictionaryRouter);
app.use('/api/v1/userauth', authRouter);
app.use('/api/v1/clients', clientRouter);
app.use('/api/v1/advertisers', advertiserRouter);
app.use('/api/v1/campaigns', campaignRouter);
app.use('/api/v1/placements', placementRouter);
app.use('/api/v1/creatives', creativeRouter);
app.use('/api/v1/audiences', audienceRouter);
app.use('/api/v1/third-party-audiences', thirdPartyAudienceRouter);

// PORT
let port = process.env.PORT;

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
