class ApiResponse {
  constructor(stausCode, message = "Success", data) {
    this.stausCode = stausCode;
    this.data = data;
    this.message = message;
    this.success = stausCode < 400;
  }
}

export default ApiResponse;