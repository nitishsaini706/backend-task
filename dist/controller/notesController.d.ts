import { Request, Response } from "express";
export declare const notesList: (req: Request, res: Response) => Promise<void>;
export declare const noteById: (req: Request, res: Response) => Promise<void>;
export declare const createNote: (req: Request, res: Response) => Promise<void>;
export declare const editNote: (req: Request, res: Response) => Promise<void>;
export declare const deleteNote: (req: Request, res: Response) => Promise<void>;
export declare const search: (req: Request, res: Response) => Promise<void>;
export declare const share: (req: Request, res: Response) => Promise<void>;
