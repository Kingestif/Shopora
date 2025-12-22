import type { Request, Response } from "express";

export const currentUser = async (req: Request, res: Response) => {
    try {
        if (!req.user) throw new Error('Unauthorized')
        const user = req.user
    
        return res.status(200).json({
            status: "success",
            data: user
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};