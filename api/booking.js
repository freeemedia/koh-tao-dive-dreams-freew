const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json({ bookings: data });
  } else if (req.method === 'POST') {
    const { id, ...rest } = req.body || {};
    if (!id) {
      // CREATE new booking
      const { data, error } = await supabase
        .from('bookings')
        .insert([rest])
        .select();
      if (error) return res.status(500).json({ error: error.message });
      res.status(201).json(data[0]);
      return;
    }
    // UPDATE booking by id
    const { data, error } = await supabase
      .from('bookings')
      .update(rest)
      .eq('id', id)
      .select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data[0]);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
