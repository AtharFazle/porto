import { headers } from "next/headers";

export default function getUrl() {
    const headersList = headers();
    const domain = headersList.get('host') || "";
    const fullUrl = headersList.get('referer') || "";
    
    return fullUrl
}