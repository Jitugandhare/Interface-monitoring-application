const Log = require('../models/log.js');
const sendFailureEmail = require('../utils/emailService.js');

// GET logs with filters, sorting, pagination
exports.getLogs = async (req, res) => {
    try {
        const {
            status,
            interfaceName,
            integrationKey,
            page = 1,
            limit = 50,
            sort = '-createdAt',
            startDate,
            endDate
        } = req.query;

        const query = {};
        if (status) query.status = status;
        if (interfaceName) query.interfaceName = new RegExp(interfaceName, 'i');
        if (integrationKey) query.integrationKey = integrationKey;
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const logs = await Log.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const count = await Log.countDocuments(query);

        res.json({
            logs,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page)
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
};

// POST create log
exports.createLog = async (req, res) => {
    try {
        const log = new Log(req.body);
        await log.save();

        // Send email on failure
        if (log.status === 'Failure') {
            await sendFailureEmail(log);
        }

        res.status(201).json(log);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create log' });
    }
};

// GET summary data
exports.getSummary = async (req, res) => {
    try {
        const now = new Date();
        const past24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const summary = await Log.aggregate([
            { $match: { createdAt: { $gte: past24h } } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const formatted = {
            Success: 0,
            Failure: 0,
            Warning: 0
        };

        summary.forEach(s => {
            formatted[s._id] = s.count;
        });

        res.json(formatted);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get summary' });
    }
};
