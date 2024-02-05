export async function POST(request: Request) {
  const clientId = 'shp_f12c2ae5-f5a6-4fdc-b029-415c49c0436a';
  const shopId = '67877339369';

  const body = new URLSearchParams();
  body.append('grant_type', 'authorization_code');
  body.append('client_id', clientId);
  body.append('redirect_uri', `<redirect_uri>`);
  // body.append('code', code);
}
