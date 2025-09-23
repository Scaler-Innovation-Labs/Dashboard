import { NextResponse } from "next/server";
import {
  // ApiError,
  ApiResponse
} from "@/types/api";
import { HttpStatus } from "@/constants/HttpStatus";

export async function GET() {
  const response = ApiResponse.success(
    HttpStatus.OK,
    "Health check successful",
    {},
  );
  return NextResponse.json(response, { status: response.statusCode });
}

// export async function GET() {
//     const response = ApiResponse.error(
//         HttpStatus.INTERNAL_SERVER_ERROR,
//         "Health check failed",
//         [
//             {
//                 code: "HEALTH_CHECK_FAILED",
//                 message: "Health check failed",
//                 details: "Health check failed details"
//             }
//         ]
//     );
//     return NextResponse.json(response, { status: response.statusCode });
// }
