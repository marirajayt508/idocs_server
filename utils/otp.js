exports.genpass= (len,typ='str')=>{
    const length = len;
    const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const num = '0123456789'
    let characters = text;
    if(typ=='num')
    {
        characters = num;
    }
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }