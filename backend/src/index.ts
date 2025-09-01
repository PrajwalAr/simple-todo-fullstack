import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import {
  signupSchema,
  loginSchema,
  todoCreateSchema,
  todoUpdateSchema,
  idParamSchema,
  authHeaderSchema,
  handleValidationError,
} from './validation';

// types
export type Response = express.Response;
type NextFunction = express.NextFunction;
export type RequestWithUserId = express.Request & {
  userId?: string;
};

dotenv.config({ path: './.env' });

// prisma
export const prisma = new PrismaClient({
  log: ['query'],
});

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

// middleware
function handleUserAuthorization(
  req: RequestWithUserId,
  res: Response,
  next: NextFunction
) {
  const validation = authHeaderSchema.safeParse(req.headers);

  if (!validation.success) {
    return res.status(400).json(handleValidationError(validation.error));
  }

  const { token } = validation.data;

  const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as unknown as {
    userId: string;
  };
  req.userId = userId;
  next();
}

// login routes
app.post('/api/signup', async (req, res) => {
  const validation = signupSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(handleValidationError(validation.error));
  }
  const { email, password, name } = validation.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 2);
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

app.post('/api/login', async (req, res) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json(handleValidationError(validation.error));
  }
  const { email, password } = validation.data;
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid Credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// todo routes
app.get(
  '/api/todos',
  handleUserAuthorization,
  async (req: RequestWithUserId, res: Response) => {
    try {
      const todos = await prisma.todo.findMany({
        where: {
          userId: req.userId!,
        },
      });
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

app.post(
  '/api/todos',
  handleUserAuthorization,
  async (req: RequestWithUserId, res: Response) => {
    // Validate body
    const bodyValidation = todoCreateSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      return res.status(400).json(handleValidationError(bodyValidation.error));
    }
    const { title, description, status } = bodyValidation.data;

    try {
      const todo = await prisma.todo.create({
        data: {
          title,
          description,
          status,
          userId: req.userId!,
        },
      });
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

app.put(
  '/api/todo/:id',
  handleUserAuthorization,
  async (req: RequestWithUserId, res: Response) => {
    // Validate params
    const paramValidation = idParamSchema.safeParse(req.params);
    if (!paramValidation.success) {
      return res.status(400).json(handleValidationError(paramValidation.error));
    }
    const { id } = paramValidation.data;

    // Validate body
    const bodyValidation = todoUpdateSchema.safeParse(req.body);
    if (!bodyValidation.success) {
      return res.status(400).json(handleValidationError(bodyValidation.error));
    }
    const { title, description, status, comment } = bodyValidation.data;

    try {
      const todo = await prisma.todo.update({
        where: {
          id,
          userId: req.userId!,
        },
        data: {
          ...(title !== undefined && { title }),
          ...(description !== undefined && { description }),
          ...(status !== undefined && { status }),
          ...(comment !== undefined && { comment }),
        },
      });

      res.status(200).json(todo);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

app.delete(
  '/api/todo/:id',
  handleUserAuthorization,
  async (req: RequestWithUserId, res: Response) => {
    // Validate params
    const paramValidation = idParamSchema.safeParse(req.params);
    if (!paramValidation.success) {
      return res.status(400).json(handleValidationError(paramValidation.error));
    }
    const { id } = paramValidation.data;

    try {
      const todo = await prisma.todo.delete({
        where: {
          id,
          userId: req.userId!,
        },
      });

      res.status(200).json({
        message: 'Todo deleted successfully',
        todo,
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
);

// server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
