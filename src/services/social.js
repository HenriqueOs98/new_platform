export class SocialManager {
  constructor() {
    this.user = null;
  }

  async initialize(user) {
    this.user = user;
    await this.loadUserData();
  }

  async loadUserData() {
    if (!this.user) return;
    
    const userData = localStorage.getItem(`social_${this.user.sub}`);
    if (userData) {
      return JSON.parse(userData);
    }
    
    return this.createUserData();
  }

  createUserData() {
    const userData = {
      following: [],
      followers: [],
      likedCodes: [],
      savedCodes: [],
      comments: []
    };
    
    localStorage.setItem(`social_${this.user.sub}`, JSON.stringify(userData));
    return userData;
  }

  async shareCode(code, language) {
    if (!this.user) throw new Error('Must be logged in to share code');
    
    const share = {
      id: Date.now().toString(),
      code,
      language,
      author: this.user.sub,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    
    const shares = JSON.parse(localStorage.getItem('shared_codes') || '[]');
    shares.push(share);
    localStorage.setItem('shared_codes', JSON.stringify(shares));
    
    return share;
  }

  async likeCode(codeId) {
    if (!this.user) throw new Error('Must be logged in to like code');
    
    const shares = JSON.parse(localStorage.getItem('shared_codes') || '[]');
    const share = shares.find(s => s.id === codeId);
    if (!share) throw new Error('Code not found');
    
    share.likes++;
    localStorage.setItem('shared_codes', JSON.stringify(shares));
    
    const userData = await this.loadUserData();
    userData.likedCodes.push(codeId);
    localStorage.setItem(`social_${this.user.sub}`, JSON.stringify(userData));
  }

  async addComment(codeId, comment) {
    if (!this.user) throw new Error('Must be logged in to comment');
    
    const shares = JSON.parse(localStorage.getItem('shared_codes') || '[]');
    const share = shares.find(s => s.id === codeId);
    if (!share) throw new Error('Code not found');
    
    const newComment = {
      id: Date.now().toString(),
      author: this.user.sub,
      content: comment,
      timestamp: new Date().toISOString()
    };
    
    share.comments.push(newComment);
    localStorage.setItem('shared_codes', JSON.stringify(shares));
    
    return newComment;
  }
}