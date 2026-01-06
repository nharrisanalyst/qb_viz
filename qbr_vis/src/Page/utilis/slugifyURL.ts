export const slugifyURL =(text:string):string=>{
        return text
            .toLowerCase()
            .replace(/['’]/g, "")       
            .replace(/\./g, "")          
            .replace(/[^a-z0-9]+/g, "-") 
            .replace(/^-+|-+$/g, "")
}